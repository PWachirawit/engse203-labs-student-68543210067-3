function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <div className="card-top">
          <p className="request-id">{request.id}</p>
          <span className={`badge ${request.priority}`}>{request.priority}</span>
        </div>
        <h3>{request.requestType}</h3>
        <p className="request-meta">ผู้แจ้ง: {request.requesterName} | สถานที่: {request.location}</p>
        <p className="request-details">{request.details}</p>
        <span className={`status-badge ${request.status}`}>{request.status}</span>
      </div>
      <button type="button" className="btn-delete" onClick={() => onDeleteRequest(request.id)}>
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;
