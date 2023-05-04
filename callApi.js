fetch(`127.0.0.1:3000/login`)
    .then(response => response.json())
    .then(data => console.log(data));