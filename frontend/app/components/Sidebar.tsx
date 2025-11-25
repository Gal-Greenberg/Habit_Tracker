
const Sidebar = () => {
    return (
        <aside className="sidebar px-8 py-6">
            <nav>
                <ul>
                    <li className="bg-bgButton text-textMain px-8 py-2 mt-6 rounded hover:bg-bgButtonDark">
                        <a href="/habits">Habits</a>
                    </li>
                    <li className="bg-bgButton text-textMain px-8 py-2 mt-10 rounded hover:bg-bgButtonDark">
                        <a href="/goals">Goals</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;