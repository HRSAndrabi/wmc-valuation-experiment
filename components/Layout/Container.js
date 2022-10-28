export default function Container(props) {
    if (props.prose) {
        return (
            <div className="px-5">
                <article className="max-w-screen-prose mx-auto prose prose-slate prose-sm sm:prose-base mb-20">
                    <div className="max-w-screen-lg mx-auto flex flex-col">
                        {props.children}
                    </div>
                </article>
            </div>
        );
    } else {
        return (
            <div className="w-full flex flex-col h-full px-5 py-10 min-h-screen">
                <div className="max-screen-lg w-full mx-auto">
                    {props.children}
                </div>
            </div>
        );
    }
}
