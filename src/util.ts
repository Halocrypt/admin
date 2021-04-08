export const json = (d: any) =>
  new Response(JSON.stringify(d), {
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    },
  });
