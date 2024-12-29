import React, { useState } from "react";
import { useCommunication } from "../context/data";
import "./userDashboard.css";

const UserDashboard = () => {
  const {
    state,
    addCommunication,
    getLastFiveCommunications,
    getNextScheduledCommunication,
  } = useCommunication();

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationModal, setCommunicationModal] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [communicationForm, setCommunicationForm] = useState({
    type: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);

    const addOrdinal = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      const suffixes = ["th", "st", "nd", "rd"];
      const mod = day % 10;
      return `${day}${suffixes[mod] || "th"}`;
    };

    const [month, day, year] = formattedDate.split(" ");
    return `${addOrdinal(parseInt(day))} ${month}, ${year}`;
  };

  const toggleCompanySelection = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const logCommunication = (e) => {
    e.preventDefault();
    selectedCompanies.forEach((companyId) => {
      addCommunication({
        ...communicationForm,
        companyId,
        timestamp: new Date(communicationForm.date),
      });
    });
    setCommunicationModal(false);
    setSelectedCompanies([]);
  };

  const determineStatus = (company) => {
    const today = new Date();
    const lastComDate = new Date(company.lastCommunicationDate);
    const daysSinceLastCom = Math.floor(
      (today - lastComDate) / (1000 * 60 * 60 * 24)
    );
    const periodicity = company.communicationPeriodicity || 14;

    if (daysSinceLastCom > periodicity) return "overdue";
    if (daysSinceLastCom === periodicity) return "due-today";
    return "normal";
  };

  const renderTooltip = (communication) => (
    <div className="communication-tooltip">
      <p>Type: {communication.type}</p>
      <p>Date: {new Date(communication.timestamp).toLocaleDateString()}</p>
      <p>Notes: {communication.notes || "No notes"}</p>
      <p>Sequence: {communication.sequence}</p>
    </div>
  );

  return (
    <div className="user-dashboard">
      <h1>User's ConnectTrack Hub</h1>

      <section className="companies-grid">
        {state.companies.map((company) => {
          const lastFive = getLastFiveCommunications(company.id);
          const nextComm = getNextScheduledCommunication(company.id);

          return (
            <div
              key={company.id}
              className={`company-row ${determineStatus(company)}`}
            >
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company.id)}
                onChange={() => toggleCompanySelection(company.id)}
              />
              <h3>{company.name}</h3>

              <div className="last-communications">
                <h4>Recent Communications</h4>
                {lastFive.map((comm) => (
                  <div
                    key={comm.id}
                    className="communication-item"
                    onMouseEnter={() => setSelectedCommunication(comm)}
                    onMouseLeave={() => setSelectedCommunication(null)}
                  >
                    {comm.type} - {formatDate(comm.timestamp)}
                    {selectedCommunication === comm && renderTooltip(comm)}
                  </div>
                ))}
              </div>

              <div className="next-communication">
                <h4>Next Scheduled Communication</h4>
                {nextComm ? (
                  <div>
                    {nextComm.type} - {formatDate(nextComm.date)}
                  </div>
                ) : (
                  <div>No scheduled communication</div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <button
        onClick={() => setCommunicationModal(true)}
        disabled={selectedCompanies.length === 0}
        className="logComm"
      >
        Log Communication
      </button>

      {communicationModal && (
        <div className="communication-modal">
          <form onSubmit={logCommunication}>
            <select
              value={communicationForm.type}
              onChange={(e) =>
                setCommunicationForm((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              required
            >
              <option value="">Select Communication Type</option>
              {state.communicationMethods.map((method) => (
                <option key={method.id} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={communicationForm.date}
              onChange={(e) =>
                setCommunicationForm((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              required
            />
            <textarea
              placeholder="Communication Notes"
              value={communicationForm.notes}
              onChange={(e) =>
                setCommunicationForm((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
            />
            <button type="submit" className="logComm">
              Log Communication
            </button>
            <button type="button" onClick={() => setCommunicationModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;