function AuthorProfileCard({firstname, lastname, bio, dob}) {

    return (
        <div className="profile-detail-container">
            <div className="profile-author-name">
                <h4 className="profile-author-firstname">{firstname}</h4>
                <h4 className="profile-author-lastname">{lastname}</h4>
            </div>
            <p className="author-bio">{bio}</p>
            <p className="author-dob">{dob}</p>
        </div>
    )
}