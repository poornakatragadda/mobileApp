// src/services/api.js

export const login = (email, password) => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // Password complexity: at least 8 chars, upper, lower, digit, special char
  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passRegex.test(password)) {
    return {
      success: false,
      error:
        "Password must be 8+ chars, include upper, lower, digit, and special character.",
    };
  }

  // Mock correct credentials
  if (password === "Test@1234") {
    return { success: true, userId: email };
  }

  return { success: false, error: "Incorrect email or password" };
};

export const forgotPassword = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // Mock success
  return { success: true };
};

export const registerUser = (email, password, confirmPassword) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passRegex.test(password)) {
    return {
      success: false,
      error:
        "Password must be 8+ chars, include upper, lower, digit, and special character.",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  // Mock success
  return { success: true };
};

export const getPolicies = () => [
  {
    policyNumber: "P-12345678",
    address: "123 Elm Street, Springfield, IL",
    status: "Active",
    annualPremium: "$1,200",
    effectiveDates: "Jan 1, 2023 - Dec 31, 2023",
    premiumDue: "$100 due Oct 15",
    agencyName: "ABC Insurance Agency",
    agencyAddress: "456 Oak Ave, Springfield, IL",
  },
  {
    policyNumber: "P-87654321",
    address: "789 Pine Road, Metropolis, IL",
    status: "Active",
    annualPremium: "$950",
    effectiveDates: "Mar 1, 2023 - Feb 28, 2024",
    premiumDue: "$0 due - Paid up",
    agencyName: "XYZ Insurance Partners",
    agencyAddress: "101 Maple Blvd, Metropolis, IL",
  },
];

export const getPolicyDetails = (id) => {
  return {
    name: "Home Insurance - Comprehensive",
    policyNumber: "P-12345678",
    coverage: "Fire, Theft, Water Damage, Liability",
    agencyName: "ABC Insurance Agency",
    agencyAddress: "456 Oak Ave, Springfield, IL",
    annualPremium: "$1,200",
    effectiveDates: "Jan 1, 2023 - Dec 31, 2023",
    premiumDue: "$100 due Oct 15",
  };
};

export async function fetchPoliciesFromBackend(userId) {
  try {
    const response = await fetch(
      "https://oasis.green.thig.com/api/customer/getCustomerByUsername",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Assuming data structure as provided:
    // {
    //   "response": {
    //     "email": "...",
    //     "policies": [ ... policy objects ...]
    //   },
    //   "success": true
    // }

    const policies = data?.response?.policies || [];

    // Map the complex structure to a simpler format
    return policies.map((policy) => {
      // Extract main info:
      const policyNumber = policy.policyNumber;
      const address = policy.address?.formattedAddress || "";
      const status = policy.terms?.[0]?.statusDisplay || "N/A";
      const annualPremium =
        policy.terms?.[0]?.billing?.totalPremium !== undefined
          ? `$${policy.terms[0].billing.totalPremium}`
          : "N/A";

      const effectiveDate = policy.terms?.[0]?.effectiveDate || "";
      const expirationDate = policy.terms?.[0]?.expirationDate || "";
      const effectiveDates =
        effectiveDate && expirationDate
          ? `${effectiveDate.replace(
              ", 12:00:00 AM",
              ""
            )} - ${expirationDate.replace(", 12:00:00 AM", "")}`
          : "N/A";

      const premiumDue = policy.billing?.currentAmountDueDisplay || "N/A";
      const agencyName = policy.agency?.name || "N/A";
      // Use the billing address from the first term:
      const agencyAddress =
        policy.terms?.[0]?.billing?.billingAddress?.formattedAddress || "N/A";

      // Coverage: use lobType as a coverage summary placeholder
      const coverage = policy.lobType || "N/A";

      // Return a simplified policy object
      return {
        policyNumber,
        address,
        status,
        annualPremium,
        effectiveDates,
        premiumDue,
        agencyName,
        agencyAddress,
        coverage,
        // Include the entire raw policy if needed:
        rawPolicy: policy,
      };
    });
  } catch (error) {
    console.error("Error fetching policies:", error);
    return [];
  }
}

export async function addPolicyToBackend(userId, policyData) {
  try {
    const response = await fetch("https://api.example.com/addPolicy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        policyNumber: policyData.policyNumber,
        agencyCode: policyData.agencyCode,
        zipCode: policyData.zipCode,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to add policy.",
      };
    }

    const data = await response.json();
    return { success: true, policy: data.policy };
  } catch (error) {
    console.error("Error adding policy:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
