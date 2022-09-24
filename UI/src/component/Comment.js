
const commentData = [
    {
        "userName": "Tiến Minh",
        "time": "2 days ago",
        "content": "Sản phẩm rất tuyệt vời"
    },
    {
        "userName": "Tiến Minh",
        "time": "2 days ago",
        "content": "Sản phẩm rất tuyệt vời"
    },
    {
        "userName": "Tiến Minh",
        "time": "2 days ago",
        "content": "Sản phẩm rất tuyệt vời"
    },
    {
        "userName": "Tiến Minh",
        "time": "2 days ago",
        "content": "Sản phẩm rất tuyệt vời"
    },

]


function OneComment({ comment }) {
    return (<div className="container mt-3">
        <div class="card p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                    <span class="badge bg-secondary" >{comment.userName[0]}</span>
                    <span>
                        <small class="font-weight-bold text-dark mx-3">{comment.userName}</small>
                    </span>
                </div>
                <small>{comment.time}</small>
            </div>
            <div class="action d-flex justify-content-between mt-2 align-items-center" >
                <div class="reply p-3 mx-4 card bg-light h-100">
                    <small class="font-weight-bold h4">{comment.content}</small>
                </div>
            </div>
        </div>
    </div>)
}

export default function Comment() {
    return (
        <div class="container">
            {commentData.map(comment => {
                return <OneComment comment={comment} />
            })}
        </div>)
}