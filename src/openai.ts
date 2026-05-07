export const getAbsolutePrompt = async (
  subject: string,
  style: string
) => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          style,
        }),
      }
    );

    const data = await response.json();

    return data.result;

  } catch (error) {
    console.error("Frontend API Error:", error);
    return "Something went wrong.";
  }
};