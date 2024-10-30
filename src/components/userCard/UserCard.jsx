
function UserCard({ username, email }) {

    return (
        <div>
            <div className="account-container">
                <p>Username: {username}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    )
}

export default UserCard;