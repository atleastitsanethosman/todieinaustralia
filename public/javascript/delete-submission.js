async function deleteFormHandler(event) {
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  const response = await fetch(`/api/Submission-routes/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        submission_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  
}

document.querySelector('.delete-submission-btn').addEventListener('click', deleteFormHandler);