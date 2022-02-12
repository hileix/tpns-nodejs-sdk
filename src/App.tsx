import './App.css';
import { Tpns } from './tpns';

function App() {
  const handleSendMessage = async () => {
    const tpns = new Tpns({
      baseURL: 'https://api.tpns.sh.tencent.com/',
      accessID: 'accessID',
      secretKey: 'secretKey',
    });

    const res = await tpns.push({
      audience_type: 'all',
      message: {
        title: 'title-1',
        content: 'content-1',
      },
      message_type: 'notify',
      environment: 'dev',
    });
  };

  return (
    <div className='App'>
      <button onClick={handleSendMessage}>send message</button>
    </div>
  );
}

export default App;
