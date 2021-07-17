//display filename after selected.
const fileInput = document.querySelector('#file-img-upload input[type=file]');
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#file-img-upload .file-name');
    fileName.textContent = fileInput.files[0].name;
  }
}

async function newFormHandler(event) {
  event.preventDefault();

  //collect file data from form to send image.
  const fileSend = new FormData()
  const formFiles = document.querySelector('#file-img-upload input[type=file]');
  
  fileSend.append('image', formFiles.files[0])

  //call to express that actually sends image to S3 and returns image link to S3 bucket
  const imageUpload = await fetch(`/api/Submission-routes/img`, {
    method: 'POST',
    body: fileSend
  }).then(response => response.json()
  ).catch(error => console.log(error))
  console.log(imageUpload);

  const img_link = imageUpload.img_link.toString();
  const title = document.querySelector('input[name="post-title"]').value;
  const text = document.querySelector('input[name="post-content"]').value;
  
  //code to get selection from drop down list
  const categoryList = document.querySelector("#category")
  const categorySelected = document.querySelector("#category").selectedIndex;
  const category = categoryList.options[categorySelected].value
  
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
    // document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);