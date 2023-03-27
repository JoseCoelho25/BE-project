import React from "react"; 
import { Link } from "react-router-dom";

function Cancel() { 
  return ( 
    <div className="mx-auto w-full text-center"> 
      <h2 className="text-2xl pt-8">Ups algo correu mal!</h2> 
      <h4 className="text-xl my-6">O seu pagamento não foi realizado com sucesso!</h4> 
      <p> 
        Se necessitar de ajuda pode contactar-nos no email <a href="" className="underline">shopeasy@email.com</a>
      </p> 
      <div className="mt-8 border-black border w-48 mx-auto">
        <Link to='/'>
          Back to Home Page
        </Link> 
      </div>
      
  </div> 
  ); 
} 

export default Cancel; 