import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component{
    state ={
        listArtikel: [],
        insertArtikel: {        // variabel yang digunakan untuk menampung sementara data yang akan di insert
            userId: 1,          // kolom userId, id, title, dan body sama, mengikuti kolom yang ada pada listArtikel.json
            id: 1,
            title: "",
            body: ""
        }
    }

    ambiDataDariServerAPI = () =>{
        fetch('http://localhost:3001/post')        //alamat URL API yang ingin kita ambil datanya
            .then(response => response.json())      // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {        // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
                this.setState( {
                    listArtikel: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount(){
        this.ambiDataDariServerAPI()
    }

    handleHapusArtikel = (data) => {
        fetch(`http://localhost:3001/post/${data}`,{method:'DELETE'}).then(res => {
            this.ambiDataDariServerAPI()
        })
    }
    handleTambahArtikel = (event) => {      // fungsi untuk meng-handle form tambah data artikel
        let formInsertArtikel = {...this.state.insertArtikel};
        let timestamp = new Date().getTime();
        formInsertArtikel['id'] = timestamp;
        formInsertArtikel[event.target.name] = event.target.value;
        this.setState({
            insertArtikel: formInsertArtikel
        })
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/post', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertArtikel)
        }).then( (Response) => {
                this.ambiDataDariServerAPI()
            });
    }
    
    render(){
        return(
           <div className="post-artikel">
               <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Isi</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="body" name="body" rows="3" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
               <h2>Daftar Artikel</h2>
               {
                   this.state.listArtikel.map(artikel => {
                       return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} idArtikel={artikel.id} 
                                hapusArtikel={this.handleHapusArtikel}/>
                   })
               }
           </div>
        )
    }
}

export default BlogPost;