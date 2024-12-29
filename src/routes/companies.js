import React, { useState } from "react";
import { useCommunication } from "../context/data";
import "./companies.css";

function CompanyListPage() {
  const { state, updateCompany, deleteCompany } = useCommunication();

  const [editingCompany, setEditingCompany] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    id: "",
    name: "",
    location: "",
    linkedinProfile: "",
    emails: [""],
    phoneNumbers: [""],
    comments: "",
    communicationPeriodicity: 30,
    communicationMethods: [],
  });

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...companyForm.emails];
    newEmails[index] = value;
    setCompanyForm((prev) => ({ ...prev, emails: newEmails }));
  };

  const handleAddEmail = () => {
    setCompanyForm((prev) => ({
      ...prev,
      emails: [...prev.emails, ""],
    }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...companyForm.phoneNumbers];
    newPhones[index] = value;
    setCompanyForm((prev) => ({ ...prev, phoneNumbers: newPhones }));
  };

  const handleAddPhone = () => {
    setCompanyForm((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
  };

  const startEditCompany = (company) => {
    setEditingCompany(company.id);
    setCompanyForm({ ...company });
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    updateCompany(companyForm);
    setEditingCompany(null);
  };

  const renderContactDetails = (company) => {
    return (
      <div className="contact-details">
        <div className="contact-section">
          <h4>Emails</h4>
          {company.emails && company.emails.length > 0 ? (
            <ul>
              {company.emails.map((email, index) => (
                <li key={index}>
                  <span className="email-icon">✉️</span> {email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No email addresses</p>
          )}
        </div>

        <div className="contact-section">
          <h4>Phone Numbers</h4>
          {company.phoneNumbers && company.phoneNumbers.length > 0 ? (
            <ul>
              {company.phoneNumbers.map((phone, index) => (
                <li key={index}>
                  <span className="phone-icon">📞</span> {phone}
                </li>
              ))}
            </ul>
          ) : (
            <p>No phone numbers</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="company-list-page">
      <h1>Companies Management</h1>

      {state.companies.map((company) => (
        <div key={company.id} className="company-card">
          {editingCompany === company.id ? (
            <form onSubmit={handleUpdateCompany} className="edit-company-form">
              <input
                type="text"
                name="name"
                value={companyForm.name}
                onChange={handleCompanyChange}
                placeholder="Company Name"
                required
              />
              <input
                type="text"
                name="location"
                value={companyForm.location}
                onChange={handleCompanyChange}
                placeholder="Location"
              />
              <input
                type="url"
                name="linkedinProfile"
                value={companyForm.linkedinProfile}
                onChange={handleCompanyChange}
                placeholder="LinkedIn Profile"
              />

              <div className="email-management">
                <h4>Emails</h4>
                {companyForm.emails.map((email, index) => (
                  <input
                    key={index}
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    placeholder="Email Address"
                  />
                ))}
                <button type="button" onClick={handleAddEmail}>
                  Add Email
                </button>
              </div>

              <div className="phone-management">
                <h4>Phone Numbers</h4>
                {companyForm.phoneNumbers.map((phone, index) => (
                  <input
                    key={index}
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    placeholder="Phone Number"
                  />
                ))}
                <button type="button" onClick={handleAddPhone}>
                  Add Phone
                </button>
              </div>

              <input
                type="number"
                name="communicationPeriodicity"
                value={companyForm.communicationPeriodicity}
                onChange={handleCompanyChange}
                placeholder="Communication Frequency (days)"
              />
              <textarea
                name="comments"
                value={companyForm.comments}
                onChange={handleCompanyChange}
                placeholder="Additional Comments"
              />

              <div className="form-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditingCompany(null)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="company-details">
              <h2>{company.name}</h2>
              <p>Location: {company.location}</p>
              <p>LinkedIn: {company.linkedinProfile || "N/A"}</p>
              <p>
                Communication Frequency: {company.communicationPeriodicity} days
              </p>

              {renderContactDetails(company)}

              <div className="company-actions">
                <button onClick={() => startEditCompany(company)}>
                  Edit Company
                </button>
                <button onClick={() => deleteCompany(company.id)}>
                  Delete Company
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CompanyListPage;