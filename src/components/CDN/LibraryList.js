import { Link } from 'react-router-dom';
import { copyToClipboard } from "../../core/Utils";

const LibraryList = (props) => {
    return (
        <div className="row">
            {
                props.libraries.map((library, index) => {
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{library.name}</h5>
                                    <div className="copy-area">
                                        <div id="inviteCode" className="invite-page">
                                            <input id="link" value={library.latest} readOnly />
                                            <div id="copy" onClick={(e) => copyToClipboard(e)}>
                                                <i className="fa fa-clipboard" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between row">
                                        <a href={library.latest} target="_blank" rel="noreferrer" className="btn btn-primary" >Latest Download</a>

                                        <Link to={'/lib/' + library.name}><button className="btn btn-secondary" >Description</button></Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default LibraryList;