interface RightPanelInterface {
    children: any;
}

const RightPanel = ({children}: RightPanelInterface) => {
    return (
        <div id="right-panel" style={{}}>
            {children}
        </div>);
}

export default RightPanel;