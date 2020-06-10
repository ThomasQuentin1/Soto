interface RightPanelInterface {
    children: any;
}

const RightPanel = ({children} : RightPanelInterface) => {

return (
<div id="right-panel" style={{borderLeft: "1px solid black", height:"100%", paddingLeft:"30px"}}>
    {children}
</div>);
}

export default RightPanel;