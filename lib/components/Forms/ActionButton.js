export default function ActionButton({api_route, method, form_data, children}) {
    return(
        <form className="" action={api_route} method={method}>
            <div className="flex flex-col">
                {form_data.map((data, index) => {
                    return <input key={`action_btn_${data.id}_${index}`} type="hidden" id={data.id} name={data.name} value={data.value} />;
                })}

                {children}
            </div>
        </form>
    );
}