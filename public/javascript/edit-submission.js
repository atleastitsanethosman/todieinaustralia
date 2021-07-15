async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="submission-title"]').value;
  const text = document.querySelector('input[name="submission-content"]').value;
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  const response = await fetch(`/api/Submission-routes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          text
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

document.querySelector('.edit-submission-form').addEventListener('submit', editFormHandler);