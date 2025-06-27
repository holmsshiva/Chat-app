import SelectUser from './components/SelectUser';
import SelectChannel from './components/SelectChannel';
import Chat from './components/ChatWindow';
import MessageInput from './components/MessageInput';

function App() {
  return (
    <div className="flex flex-col text-gray-900 bg-white h-full min-h-[100vh] box-border">
        <div className='flex flex-col px-4'>
            <h1 className="text-2xl font-bold ">1 day chat App </h1>
            <p className="text-gray-500 text-sm mb-6">All messages will be deleted at every 00:00 UTC </p>
        </div>
        <div className="flex-1 flex w-full h-full bg-slate-200">
            <div className="w-1/4 p-4 border-r border-gray-300">
                <SelectUser />
                <SelectChannel />
            </div>
            <div className="w-3/4 flex-1 flex flex-col">
                <div className="flex-grow">
                    <Chat />
                </div>
                <MessageInput />
            </div>
        </div>
    </div>
  );
}

export default App;