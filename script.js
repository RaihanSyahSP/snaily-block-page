// Fungsi untuk mengambil query 'f' dari URL
function getJwtTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('f');
}

// Fungsi untuk mendekode JWT menggunakan fungsi parseJwt
function decodeJwt(jwtToken) {
  const base64Url = jwtToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)  ;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Mengambil JWT token dari URL dan mendekodekannya
const jwtToken = getJwtTokenFromUrl();
if (jwtToken) {
  const decodedToken = decodeJwt(jwtToken);
    console.log(decodedToken);
     const childId = decodedToken.childId;
     const webUrl = decodedToken.web_url;
    const parentId = decodedToken.parentId;
    
    const url = 'https://snailly.fajarbuana.my.id/notification/send'
    const postData = {
        childId: childId,
        id: parentId,
        web_url: webUrl
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization:
          // "Bearer " + jwtToken,
        // "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3YWIxZTcwLTlkOGEtNGZlOC1hNTA2LTE2NTlmYTVlZDE1MiIsImVtYWlsIjoicmFpaGFuQGdtYWlsLmNvbSIsIm5hbWUiOiJyYWloYW4gc3lhaCIsImlhdCI6MTY4OTA0MzE3MiwiZXhwIjoxNjg5MTI5NTcyfQ.WOO01AvkbAKgIXfaKERETcOy5evbOcM6-i57itZhJXhLtnBzScAh5WnaWHSxTV-zkFYmlisV6Lrd9wZZuC0_obHwpz65RQhijCRyY7-ImQbeB6lO2EyuSnzTJGGG9GWgvdQxrCMLiAiwvo3eGGEC1XinKbmI4TfpxKJDuyM9zug",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Notification sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
} else {
  console.log('JWT token not found in the URL');
}
