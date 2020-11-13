import express, { Request, Response } from "express";
import api from "./services/api";

const app = express();

app.use(express.json());

// body
// {
//   token,
//   idUser,
//   idProduct
// }

const tokens = ["aabbbcc", "acbfdsar"];

let likes = [
  {
    token: "aabbbcc",
    idUser: "123123213123",
    idProduct: "4543367512203",
  },
  {
    token: "aabbbcc",
    idUser: "123123213123",
    idProduct: "4538642956427",
  },
  {
    token: "aabbbcc",
    idUser: "123123213123",
    idProduct: "4543371706507",
  },
  {
    token: "aabbbcc",
    idUser: "123123213123",
    idProduct: "4543373377675",
  },
  {
    token: "aabbbcc",
    idUser: "123123213123",
    idProduct: "4543375638667",
  },
];

app.get("/user/like", (request, response) => {
  const { token, idUser, idProduct } = request.body;
  let isLike = true; //true: Adiciona o like / false: Remove o like
  
  checkToken(request, response);

  if (!idUser && !idProduct)
    response.status(400).json({
      status: 400,
      message: "Valide os dados enviados para o backend!",
    });

  const likeIndex = likes.findIndex(
    (like) => like.idUser === idUser && like.idProduct === idProduct
  );

  if (likeIndex > -1) {
    //Remove o like
    const likesTmp = likes.filter((like, index) => index != likeIndex);
    likes = likesTmp;
    isLike = false;
  } else likes.push({ token, idUser, idProduct }); //Adiciona o like

  response.json({ status: 200, like: isLike });
});

app.get("/user/favorite", async (request, response) => {
  const { token, idUser } = request.body;

  checkToken(request, response);

  const lstLike = likes.filter((like) => like.idUser === idUser);

  let products = [];
  for (let index = 0; index < lstLike.length; index++) {
    const { idProduct } = lstLike[index];
    const product = await getProducts(idProduct);

    products.push(product);
  }

  response.json(products);
});

const getProducts = async (idProduct: any) => {
  const productResponse = await api.get(`/products/${idProduct}.json`);

  const product = productResponse.data;

  return product;
};

const checkToken = (request: Request, response: Response) => {
  const { token } = request.body;

  const isToken = tokens.find((tokenTmp) => tokenTmp === token);

  if (!isToken)
    response.status(403).json({
      status: 403,
      message: "Acesso não autorizado! Verifique o token.",
    });
};

app.listen(3333, () => {
  console.log("Server Started");
});
