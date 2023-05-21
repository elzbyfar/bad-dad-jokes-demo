const [data, setData] = useState([]);
  const headers = ["id", "type", "setup", "punchline"];
  const URL = "https://official-joke-api.appspot.com/random_joke";

  const handleAPICall = async () => {
    const res = await fetch(URL);
    const json = await res.json();
    setData((prevState) => [...prevState, json]);
  };

  useEffect(() => {
    if (!data.length) {
      handleAPICall();
    }
    const interval = setInterval(() => handleAPICall(), 15000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div>
      <table style={{ border: "1px solid #000" }}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} style={{ border: "1px solid #000" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((jokeObj, index) => (
            <tr key={index}>
              {headers.map((header, i) => (
                <td key={i} style={{ border: "1px solid #000" }}>
                  {jokeObj[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleAPICall()}>Fetch Joke!</button>
    </div>