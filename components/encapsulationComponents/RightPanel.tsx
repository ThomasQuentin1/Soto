interface RightPanelInterface {
    children: any;
}

const RightPanel = ({children} : RightPanelInterface) => {

return (
<div id="right-panel">
    {children}
</div>);
}

export default RightPanel;