// src/components/ApplicationForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    email: "",
    companyContact: "",
    fullName: "",
    province: "",
    district: "",
    sector: "",
    department: "",
    phoneNumber: "",
    password: "",
    proofDocument: null as File | null,
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const provinces = ["Kigali", "Northern", "Southern", "Eastern", "Western"];
  const districts = {
    Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
    Northern: ["Musanze", "Gicumbi", "Burera"],
    Southern: ["Huye", "Nyanza", "Muhanga"],
    Eastern: ["Rwamagana", "Nyagatare", "Kayonza"],
    Western: ["Rusizi", "Rubavu", "Nyamasheke"],
  };
  const sectors = {
    Gasabo: ["Gikomero", "Kacyiru", "Kimironko"],
    Kicukiro: ["Nyarutarama", "Kanombe", "Gahanga"],
    Nyarugenge: ["Nyamirambo", "Kimisagara", "Muhima"],
    Musanze: ["Musanze", "Muhoza", "Kinigi"],
    Gicumbi: ["Gicumbi Sector 1", "Gicumbi Sector 2"],
    Burera: ["Burera Sector 1", "Burera Sector 2"],
    Huye: ["Huye Sector 1", "Huye Sector 2"],
    Nyanza: ["Nyanza Sector 1", "Nyanza Sector 2"],
    Muhanga: ["Muhanga Sector 1", "Muhanga Sector 2"],
    Rwamagana: ["Rwamagana Sector 1", "Rwamagana Sector 2"],
    Nyagatare: ["Nyagatare Sector 1", "Nyagatare Sector 2"],
    Kayonza: ["Kayonza Sector 1", "Kayonza Sector 2"],
    Rusizi: ["Rusizi Sector 1", "Rusizi Sector 2"],
    Rubavu: ["Rubavu Sector 1", "Rubavu Sector 2"],
    Nyamasheke: ["Nyamasheke Sector 1", "Nyamasheke Sector 2"],
  };
  const departments = ["Management", "Finance", "HR", "IT", "Operations"];

  const validate = () => {
    let newErrors: typeof errors = {};

    // Required fields
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.companyEmail) newErrors.companyEmail = "Company email is required";
    if (!formData.email) newErrors.email = "Manager email is required";
    if (!formData.companyContact) newErrors.companyContact = "Company contact is required";
    if (!formData.fullName) newErrors.fullName = "Contact person name is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.proofDocument) newErrors.proofDocument = "Proof document is required";
    if (!formData.agree) newErrors.agree = "You must agree to the terms & conditions";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.companyEmail && !emailRegex.test(formData.companyEmail)) {
      newErrors.companyEmail = "Invalid company email";
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid manager email";
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    // File type validation
    if (formData.proofDocument) {
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(formData.proofDocument.type)) {
        newErrors.proofDocument = "Allowed file types: PDF, PNG, JPG, JPEG";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (key === "proofDocument" && value instanceof File) {
            formDataToSend.append(key, value);
          } else if (key !== "agree") {
            formDataToSend.append(key, value as string);
          }
        }
      });

      const res = await fetch("https://missiontrack-backend.onrender.com/api/company/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Success:", data);
        navigate("/login");
      } else {
        console.error("❌ Error:", data);
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center p-6 lg:p-12 gap-10 w-full">
      {/* Left Side */}
      <div>
        <h1 className="text-accent-800 text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Enter Your Contacts and <br /> Company Info for Registration
        </h1>
        <img src="bro.png" alt="illustration" className="w-60 sm:w-80 md:w-96 mt-20" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-start lg:w-1/2 w-full">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <img src="logo.svg" alt="logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="font-bold text-lg sm:text-xl ml-2">
            <span className="text-primaryColor-700">Mission</span>
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md flex flex-col items-start text-left">
          <h2 className="text-lg sm:text-xl font-bold text-accent-500 mb-6">
            New Company Application Form
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 w-full">
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Enter company name"
              error={errors.companyName}
            />
            <Input
              label="Company Email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
              placeholder="Enter company email"
              type="email"
              error={errors.companyEmail}
            />
            <Input
              label="Manager Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter manager email"
              type="email"
              error={errors.email}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Province"
                name="province"
                value={formData.province}
                options={provinces}
                placeholder="Province"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    province: e.target.value,
                    district: "",
                    sector: "",
                  });
                }}
              />
              <Select
                label="District"
                name="district"
                value={formData.district}
                options={formData.province ? districts[formData.province] : []}
                placeholder="District"
                onChange={(e) => {
                  setFormData({ ...formData, district: e.target.value, sector: "" });
                }}
              />
              <Select
                label="Sector"
                name="sector"
                value={formData.sector}
                options={formData.district ? sectors[formData.district] || [] : []}
                placeholder="Sector"
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              />
            </div>

            <Input
              label="Contact Person (Full Name)"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter contact person name"
              type="text"
              error={errors.fullName}
            />
            <Input
              label="Company Contact"
              name="companyContact"
              value={formData.companyContact}
              onChange={(e) => setFormData({ ...formData, companyContact: e.target.value })}
              placeholder="Enter company contact"
              type="tel"
              error={errors.companyContact}
            />
            <Select
              label="Department"
              name="department"
              value={formData.department}
              options={departments}
              placeholder="Select department"
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Enter manager phone number"
              type="tel"
              error={errors.phoneNumber}
            />
            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              type="password"
              error={errors.password}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Proof Document</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  setFormData({ ...formData, proofDocument: e.target.files?.[0] || null })
                }
                className="block w-full text-sm border rounded-lg p-2"
              />
              {errors.proofDocument && <p className="text-red-500 text-sm mt-1">{errors.proofDocument}</p>}
            </div>

            <div>
              <Checkbox
                label="I agree to the Terms & conditions"
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
              />
              {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primaryColor-700 text-white py-2 rounded-2xl hover:bg-primaryColor-800 mt-4 w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
