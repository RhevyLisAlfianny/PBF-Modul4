import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

import BlogPost from "./container/BlogPost/BlogPost";
import Mahasiswa from './container/Mahasiswa/Mahasiswa';

ReactDOM.render(
  <Mahasiswa />,
  document.getElementById('content')
);

serviceWorker.unregister();

