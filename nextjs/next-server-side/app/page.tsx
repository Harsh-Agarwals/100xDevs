const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // const response = await fetch("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");
  // const response = await fetch("http://localhost:3001/api/user")
  // const data = await response.json();
  // console.log(data);  
  // return data;
}

export default async function Home() {
  // const data = await getData();

  return (
    // <div>{data?.name} - {data?.email}</div>
    <div>hi hi hi</div>
  );
}
