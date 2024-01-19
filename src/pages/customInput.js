import React from "react";
export default function CustomInput({ objValue, onChange, index }) {
    const { label, type, value } = objValue;

    switch (type) {
        case "radio":
            return <>
                <div>
                    <div className="form-label" htmlFor={label}>{label}</div>
                    <div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div>
                                <input type="radio" id="Yes" name={label} value={"Yes"} />
                                <label style={{ fontSize: "14px", color: "#1D2226", fontWeight: "500" }} for="Yes">Yes</label>
                            </div>
                            <div>
                                <input type="radio" id="No" name={label} value={"No"} />
                                <label style={{ fontSize: "14px", color: "#1D2226", fontWeight: "500" }} for="No">No</label>
                            </div>
                        </div>
                    </div>
                </div>

            </>;

        default:
            return <>
                <div>
                    <div className="form-label" htmlFor={label}>{label}</div>
                    <div>
                        <input
                            type={type || "text"}
                            id={label}
                            value={value || ""}
                            onChange={(e) => onChange(e, index)}
                            style={{ width: "70%", borderRadius: "12px", border: "1px solid #ced4da", fontSize: "14px", padding: "0.48rem" }}
                            placeholder={`Enter ${label}`}
                        />
                    </div>
                </div>

            </>;
    }

}