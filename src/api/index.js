const baseUrl = process.env.REACT_APP_API_URL;

const headers = new Headers({
  "Content-Type": "application/json"
});

export async function fetchKudos() {
  try {
    const result = await fetch(`${baseUrl}/kudos`, {
      headers,
      method: "GET"
    });
    return await result.json();
  } catch (err) {
    console.error("Something went wrong fetching the kudos", err);
    return [];
  }
}

export async function saveKudo(kudo) {
  try {
    const result = await fetch(`${baseUrl}/kudos`, {
      headers,
      method: "POST",
      body: JSON.stringify(kudo)
    });
    return await result.json();
  } catch (err) {
    console.error("Something went wrong saving the kudo: ", kudo, err);
    return null;
  }
}
