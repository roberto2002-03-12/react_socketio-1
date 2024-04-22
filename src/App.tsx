import { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface IMessage {
  body: string;
  from: string;
}

// instanciar conexión para socket io
const socket = io("http://localhost:3000");

export const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setMessages([...messages, { 
      body: message,
      from: 'me'
    }]);
    // utilizar el evento message establecido en la api
    socket.emit('message', message);
  };

  // al momento de renderizarce te suscribes al evento "message"
  // por cada vez que el evento sea llamado se realizará una ejecución
  // en parte del socket.io, eso no significa que el useEffect se este
  // volviendo a ejecutar porque solo se ejecuta una vez, y durante
  // esa primera y única ejecución te suscribes al evento de message
  useEffect(() => {
    console.log('me suscribo al evento')
    // captar para recibir eventos emitidos por el lado de la api
    socket.on('message', recieveMessage);
    // ¿Por qué no enviarle de la siguiente manera?
    // socket.on('message', data => {
    //   recieveMessage(data as IMessage);
    // });
    // porque se esta creando una función anonima y al momento de
    // suscribirte se va utilizar esa función anonima de manera especifica,
    // al momento de desuscribirte no va identificar dicha función anonima
    // porque es anonima. Y si haces lo mismo en socket.off también sucedera
    // lo mismo, se estaría desuscribiendo del evento y de una función anonima
    // que en realidad te estas desuscribiendo del evento y de una función que
    // acabaste de crear, por lo tanto seguirá esta emición de doble mensaje.
    
    // el doble mensaje solo se da en React.StrictMode para este caso, y es porque
    // react modo estricto genera el componente y lo vuelve a quitar dos veces

    // cuando el componente se desmonte, entonces recien ejecutará
    // este return
    return () => {
      console.log('me desuscribo del evento')
      socket.off('message', recieveMessage);
    }
  }, []);

  const recieveMessage = (msg: IMessage) => setMessages(prev => [...prev, msg]);

  const handleOnMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-stone-800 p-8'>
        <input 
          type="text"
          placeholder='write your message'
          onChange={handleOnMessageChange}
          className='border-2 border-stone-500 p-2 w-full rounded-lg text-black'
        />
        <button
          type='submit'
          className=''
        >
          Send
        </button>
        <br />
        <ul>
          {
            messages.map((message, index) => 
              <li 
                key={index}
                className={
                  `table my-2 p-2 text-sm rounded-lg ${message.from === 'me' ?
                    'bg-sky-700 mr-auto' : `bg-gray-600 ml-auto`
                  }`
                }
              >
                <span className='text-xs text-gray-300 block'>{message.from === 'me' ? '' : 'from: '}{message.from}</span>
                 {message.body}
              </li>
            )
          }
        </ul>
      </form>
    </div>
  )
}
