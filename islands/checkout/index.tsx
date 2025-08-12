import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useState } from "preact/hooks";

const CheckoutFields = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
  } as any);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
      valid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid zip code format";
      valid = false;
    }

    if (!formData.state) {
      newErrors.state = "State is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCreatorOrder = async () => {
    try {
      const cartProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]",
      );

      const resp = await axiod.post("/api/orders/create", {
        userDetails: formData,
        userProducts: cartProducts ? cartProducts : [],
        totalOrderCount: cartProducts.length,
        totalPrice: "0",
      });

      if (resp.status === 201) {
        localStorage.clear();
        alert("order created succesfully");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      console.log("listo");
      setIsSubmitted(true);
      handleCreatorOrder();
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="form-container bg-red rounded-lg overflow-hidden mt-10">
      <div className="form-title text-white py-4 px-6">
        <h2 className="text-2xl font-bold">Order Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 bg-red">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.firstName ? "input-error" : ""
              }`}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
            />

            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.lastName ? "input-error" : ""
              }`}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address ? "input-error" : ""
            }`}
            id="address"
            name="address"
            type="text"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.city ? "input-error" : ""
              }`}
              id="city"
              name="city"
              type="text"
              placeholder="New York"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <select
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.state ? "input-error" : ""
              }`}
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="error-message">{errors.state}</p>}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zipCode"
            >
              Zip Code
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.zipCode ? "input-error" : ""
              }`}
              id="zipCode"
              name="zipCode"
              type="text"
              placeholder="10001"
              value={formData.zipCode}
              onChange={handleChange}
            />

            {errors.zipCode && <p className="error-message">{errors.zipCode}
            </p>}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutFields;
