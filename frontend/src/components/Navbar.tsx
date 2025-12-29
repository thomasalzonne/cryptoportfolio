import NavItem from "./NavItem"
import { LayoutGrid, BookUser, ArrowLeftRight, Blend, SendToBack, ChartNoAxesCombined } from 'lucide-react'

export default function Navbar() {
    return(
        <nav className="min-w-48 space-y-4">
            <NavItem title="Dashboard" icon={LayoutGrid} to="/dashboard" />
            <NavItem title="Portfolio" icon={BookUser} to="/portfolio" />
            <NavItem title="Swap" icon={ArrowLeftRight} to="/swap" />
            <NavItem title="Lending" icon={Blend} to="/lending" />
            <NavItem title="Bridge" icon={SendToBack} to="/bridge" />
            <NavItem title="Stake" icon={ChartNoAxesCombined} to="/stake" />
        </nav>
    )
}