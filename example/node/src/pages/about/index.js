import React, {Component} from "react"
import {Link} from "react-router-dom"
import styles from "./style"

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <Link to="/" className="link">
                    返回主页
                </Link>
            </div>
        )
    }
}
