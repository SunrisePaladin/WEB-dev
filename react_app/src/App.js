import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import Merch from './Merch';
import ClassComp from './ClassComp';
import Nav from './Nav';
import Content from './Content';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Header of the 1st class</h1>
        </header>
        <Nav />
        <Content />
      </div>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1>Header of the 1st class</h1>
    //   </header>
    //   <div className="Container">
    //     <Merch name="Игровой ноутбук ROG Strix gl503" price="79999" info="4.7*" photo="https://www.pcplanet.ru/public_files/products/1a/51/1a515f75d90795929c27cd956876df07/original.jpg"/>
    //     <ClassComp />
    //     <Merch name="Игровой ноутбук MSI gt72vr Dominator" price="100000" info="4.9*" photo="https://www.pngjoy.com/pngm/1/22038364_msi-gt72vr-7re-dominator-pro.png"/>
    //     <ClassComp />
    //     <Merch name="Игровой ноутбук Predator Helios" price="85000" info="4.86*" photo="https://avatars.mds.yandex.net/get-mpic/1600461/img_id3150040549562464569.png/orig"/>
    //     <ClassComp />
    //     <Merch name="Игровой ноутбук Acer Nitro AN515-57-57" price="123456" info="5.0*" photo="https://avatars.mds.yandex.net/get-mpic/5246613/img_id6366412677485622198.png/orig"/> 
    //     <ClassComp />
    //     <Merch name="Игровой ноутбук Asus ROG Zephyrus" price="99999" info="4.77*" photo="https://cdn.shopify.com/s/files/1/0228/7629/1136/products/ROGZephyrusDuo15_2_2000x.png?v=1586789906"/>
    //     <ClassComp />
    //   </div>
    // </div>
  );
}

export default App;
