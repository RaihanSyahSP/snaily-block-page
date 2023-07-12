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

async function sendNotification() {
  const jwtToken = getJwtTokenFromUrl();

  if (jwtToken) {
    try {
      const decodedToken = decodeJwt(jwtToken);
      const childId = decodedToken.childId;
      const webUrl = decodedToken.web_url;
      const parentId = decodedToken.parent.id;
  
      const url = 'https://snailly.fajarbuana.my.id/notification/send';
      const postData = {
        childId: childId,
        parentId: parentId,
        web_url: webUrl
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Notification sent successfully:', data);
      } else {
        throw new Error('Error sending notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  } else {
    console.log('JWT token not found in the URL');
  }
}

sendNotification();