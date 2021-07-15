async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const text = document.querySelector('input[name="post-content"]').value;
  const category = "temporary";
  const img_link = "temporary";
  
  const response = await fetch(`/api/Submission-routes`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      category,
      text,
      img_link
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);