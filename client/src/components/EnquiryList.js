import React from 'react';

const EnquiryList = ({ enquiries, firstName }) => {
  if (!enquiries.length) {
    return <h3>No Enquiries made</h3>;
  }

  return (
    <div>
      <h3>{firstName}</h3>
      {enquiries &&
        enquiries.map((enquiry) => (
          <div key={enquiry._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {enquiry.firstName} <br />
              <span style={{ fontSize: '1rem' }}>
                this enquiry was on {enquiry.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{enquiry.firstName}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EnquiryList;