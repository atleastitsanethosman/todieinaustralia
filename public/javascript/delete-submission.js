async function deleteFormHandler(event) {
  event.preventDefault();
  
  //code to retrieve amazon file name from the hidden div tag to pass to delete image command.
  const imgLinkTag = document.querySelector('#imgLink')
  const imgLink = imgLinkTag.getAttribute('dataid')
  const imgKey = imgLink.split("#").shift().split("?").shift().split("/").pop();

  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  //call sent to remove image file from AWS s3
  const imgRemove = await fetch(`/api/Submission-routes/s3/${imgKey}`, {
    method: 'DELETE',
    body: JSON.stringify({
      submission_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
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

const imgLinkTag = document.querySelector('#imgLink')
const imgLink = imgLinkTag.getAttribute('dataid')
const imgKey = imgLink.split("#").shift().split("?").shift().split("/").pop();
console.log(imgKey);
