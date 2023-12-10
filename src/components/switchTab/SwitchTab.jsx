import React, { useState } from "react";
import "./style.scss";

const SwitchTab = ({ data, onTabChange }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const [left, setLeft] = useState(0);
    const activeTab = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setTabIndex(index);
        }, 300);
        onTabChange(tab, index);
    };
    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data?.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            tabIndex == index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    );
};

export default SwitchTab;
