import { useState } from "react";
import CardBack from "./components/BackCard";
import CardFront from "./components/FrontCard";
import { ToastContainer, toast } from "react-toastify";
import instance from "./api/instance";

export default function App() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  const [cvv, setCvv] = useState(0);
  const [senha, setSenha] = useState("");

  async function pagar() {
    if (!nome || !numero || !mes || !ano || !cvv || !senha) {
      return toast.error("Preencha todos os campos!");
    }

    if (numero.length !== 16 || cvv.length != 3) {
      return toast.error("Número do cartão e/ou CVV inválido!");
    }

    if (ano.length !== 2) {
      return toast.error("Ano inválido");
    }

    if (mes > 12 || mes < 1) {
      return toast.error("Data de expiração inválida");
    }

    if (senha.length < 4) {
      return toast.error("Senha inválida");
    }

    try {
      const response = await instance.post("/creditcards", {
        name: nome,
        number: numero,
        expiration: `${mes}/${ano}`,
        cvv: cvv,
        password: senha,
      });

      return toast.success("Pagamento realizado com sucesso!")

    } catch (error) {
      return toast.error("Erro ao processar o pagamento.");
    }
  }

  return (
    <div className="w-full h-screen flex">
      <ToastContainer
        position="top-right"
        hideProgressBar
        autoClose={5000}
        theme="dark"
      />
      <div className="w-[40%] relative h-full bg-[#271540]">
        <div className="absolute top-8 left-65 ">
          <CardFront />
        </div>
        <div className="absolute top-80 left-96">
          <CardBack />
        </div>
      </div>
      <div className="w-[60%] h-full flex items-end p-[40px] flex-col">
        <h1 className="text-[45px] w-[70%] h-[150px] font-bold">
          Preencha os campos para concluir o pagamento!{" "}
        </h1>
        <div className="w-[65%] h-auto min-h-[200px] flex flex-col gap-4">
          <div className="w-full flex flex-col">
            <label htmlFor="nome" className="text-[18px]">
              Nome no Cartão
            </label>
            <input
              onChange={(event) => setNome(event.target.value)}
              type="text"
              className="w-full h-[40px] rounded-md bg-[#D9D9D9]"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="numero" className="text-[18px]">
              Número do Cartão
            </label>
            <input
              onChange={(event) => setNumero(event.target.value)}
              type="text"
              className="w-full h-[40px] rounded-md bg-[#D9D9D9]"
            />
          </div>
          <div className="flex">
            <div className="w-[70%] flex flex-col">
              <label htmlFor="" className="text-[18px]">
                Data de Expiração
              </label>
              <div className="w-full flex gap-2">
                <input
                  onChange={(event) => setMes(event.target.value)}
                  type="number"
                  placeholder="MM"
                  className="w-[48%] h-[40px] pl-2 rounded-md bg-[#D9D9D9]"
                />
                <input
                  onChange={(event) => setAno(event.target.value)}
                  type="number"
                  placeholder="AA"
                  className="w-[48%] h-[40px] pl-2 rounded-md bg-[#D9D9D9]"
                />
              </div>
            </div>
            <div className="w-[30%] flex flex-col">
              <label htmlFor="" className="text-[18px]">
                CVV
              </label>
              <input
                onChange={(event) => setCvv(event.target.value)}
                type="number"
                placeholder="CVV"
                className="w-full h-[40px] pl-2 rounded-md bg-[#D9D9D9]"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="" className="text-[18px]">
              Senha do Cartão
            </label>
            <input
              onChange={(event) => setSenha(event.target.value)}
              type="password"
              className="w-full h-[40px] pl-2 rounded-md bg-[#D9D9D9]"
            />
          </div>
          <button
            onClick={pagar}
            className="w-full h-[50px] cursor-pointer rounded-md bg-[#271540] text-white font-bold"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
