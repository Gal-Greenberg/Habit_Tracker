
const Sidebar = () => {
    return (
        <aside className="sidebar bg-indigo-100 px-4 lg:px-18 py-4.5 text-slate-800">
            <nav>
                <ul>
                    <li className="bg-purple-600 text-white px-8 py-2 rounded hover:bg-purple-700">
                        <a href="/">Dashboard</a>
                    </li>
                    <li className="bg-purple-600 text-white px-8 py-2 rounded hover:bg-purple-700 mt-6">
                        <a href="/habits">Habits</a>
                    </li>
                    <li className="bg-purple-600 text-white px-8 py-2 rounded hover:bg-purple-700 mt-6">
                        <a href="/goals">Goals</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;