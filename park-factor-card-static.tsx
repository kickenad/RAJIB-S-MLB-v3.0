// src/components/mlb/park-factor-card-static.tsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type ParkFactorSet } from "@/lib/parkFactors";
import { TrendingUp, TrendingDown, Landmark } from "lucide-react";


function FactorPill({ label, value }: { label: string, value: number }) {
    const isHitterFriendly = value > 1.0;
    const isPitcherFriendly = value < 1.0;

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span className="font-medium text-muted-foreground">{label}</span>
            <div className="flex items-center gap-2">
                <span className={cn(
                    "font-bold text-lg",
                    isHitterFriendly && "text-green-400",
                    isPitcherFriendly && "text-red-400"
                )}>
                    {value.toFixed(2)}
                </span>
                {isHitterFriendly && <TrendingUp className="h-5 w-5 text-green-400" />}
                {isPitcherFriendly && <TrendingDown className="h-5 w-5 text-red-400" />}
            </div>
        </div>
    )
}

interface ParkFactorStaticData extends ParkFactorSet {
    venueName: string;
}

export function ParkFactorInfoCard({ data }: { data: ParkFactorStaticData }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-primary" />
                    {data.venueName}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <FactorPill label="Home Run Factor" value={data.hrFactor} />
                <FactorPill label="Singles Factor" value={data.singleFactor} />
                <FactorPill label="Doubles Factor" value={data.doublesFactor} />
                <div className="text-xs text-muted-foreground pt-2">
                    A factor &gt; 1.00 favors hitters, while a factor &lt; 1.00 favors pitchers.
                </div>
            </CardContent>
        </Card>
    )
}
