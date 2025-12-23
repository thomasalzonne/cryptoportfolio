import Button from "./Button";
import { LayoutGrid, BookUser, ArrowLeftRight, Blend, SendToBack, ChartNoAxesCombined } from 'lucide-react'

export default function Navbar() {
    return(
        <div className="min-w-48 space-y-4">
            <Button title="Dashboard" icon={LayoutGrid} onClick={() => console.log('click')} />
            <Button title="Portfolio" icon={BookUser} onClick={() => console.log('click')} />
            <Button title="Swap" icon={ArrowLeftRight} onClick={() => console.log('click')} />
            <Button title="Lending" icon={Blend} onClick={() => console.log('click')} />
            <Button title="Bridge" icon={SendToBack} onClick={() => console.log('click')} />
            <Button title="Stake" icon={ChartNoAxesCombined} onClick={() => console.log('click')} />
        </div>
    )
}