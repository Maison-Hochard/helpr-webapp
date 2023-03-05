export async function getLinkedinToken(code: string) {
  const req = new XMLHttpRequest();
  console.log(code);
  const client_id = "78mgm14d5vyzd4";
  const client_secret = "V7J65B0t3VEdOu72";
  const redirect_uri = "http://localhost:8080/app/providers";
  const url = "https://www.linkedin.com/oauth/v2/accessToken";
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(
    "grant_type=authorization_code&code=" +
      code +
      "&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&redirect_uri=" +
      redirect_uri,
  );
  req.onreadystatechange = async function () {
    if (req.readyState === 4) {
      const response = JSON.parse(req.responseText);
      console.log(response);
      if (response.access_token) {
        await addCredentials("linkedin", response.access_token);
      }
    }
  };
}
