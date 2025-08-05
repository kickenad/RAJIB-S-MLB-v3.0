// src/components/mlb/stats-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PlayerHittingStats, PlayerPitchingStats } from "@/lib/mlb-stats"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"

const SortableHeader = ({ column, title }: { column: any, title: string }) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

export const HittingStatColumns: ColumnDef<PlayerHittingStats>[] = [
  {
    accessorKey: "playerName",
    header: "Player",
  },
  {
    accessorKey: "teamName",
    header: ({ column }) => <SortableHeader column={column} title="Team" />,
  },
  {
    accessorKey: "gamesPlayed",
    header: ({ column }) => <SortableHeader column={column} title="GP" />,
  },
  {
    accessorKey: "atBats",
    header: ({ column }) => <SortableHeader column={column} title="AB" />,
  },
  {
    accessorKey: "runs",
    header: ({ column }) => <SortableHeader column={column} title="R" />,
  },
  {
    accessorKey: "hits",
    header: ({ column }) => <SortableHeader column={column} title="H" />,
  },
  {
    accessorKey: "doubles",
    header: ({ column }) => <SortableHeader column={column} title="2B" />,
  },
  {
    accessorKey: "triples",
    header: ({ column }) => <SortableHeader column={column} title="3B" />,
  },
  {
    accessorKey: "homeRuns",
    header: ({ column }) => <SortableHeader column={column} title="HR" />,
  },
  {
    accessorKey: "rbi",
    header: ({ column }) => <SortableHeader column={column} title="RBI" />,
  },
  {
    accessorKey: "baseOnBalls",
    header: ({ column }) => <SortableHeader column={column} title="BB" />,
  },
  {
    accessorKey: "strikeOuts",
    header: ({ column }) => <SortableHeader column={column} title="SO" />,
  },
  {
    accessorKey: "stolenBases",
    header: ({ column }) => <SortableHeader column={column} title="SB" />,
  },
  {
    accessorKey: "avg",
    header: ({ column }) => <SortableHeader column={column} title="AVG" />,
  },
  {
    accessorKey: "obp",
    header: ({ column }) => <SortableHeader column={column} title="OBP" />,
  },
   {
    accessorKey: "slg",
    header: ({ column }) => <SortableHeader column={column} title="SLG" />,
  },
   {
    accessorKey: "ops",
    header: ({ column }) => <SortableHeader column={column} title="OPS" />,
  },
]

export const PitchingStatColumns: ColumnDef<PlayerPitchingStats>[] = [
  {
    accessorKey: "playerName",
    header: "Player",
  },
  {
    accessorKey: "teamName",
    header: ({ column }) => <SortableHeader column={column} title="Team" />,
  },
  {
    accessorKey: "wins",
    header: ({ column }) => <SortableHeader column={column} title="W" />,
  },
   {
    accessorKey: "losses",
    header: ({ column }) => <SortableHeader column={column} title="L" />,
  },
   {
    accessorKey: "era",
    header: ({ column }) => <SortableHeader column={column} title="ERA" />,
  },
  {
    accessorKey: "gamesPlayed",
    header: ({ column }) => <SortableHeader column={column} title="G" />,
  },
  {
    accessorKey: "inningsPitched",
    header: ({ column }) => <SortableHeader column={column} title="IP" />,
  },
   {
    accessorKey: "hits",
    header: ({ column }) => <SortableHeader column={column} title="H" />,
  },
  {
    accessorKey: "runs",
    header: ({ column }) => <SortableHeader column={column} title="R" />,
  },
  {
    accessorKey: "homeRuns",
    header: ({ column }) => <SortableHeader column={column} title="HR" />,
  },
  {
    accessorKey: "baseOnBalls",
    header: ({ column }) => <SortableHeader column={column} title="BB" />,
  },
  {
    accessorKey: "strikeouts",
    header: ({ column }) => <SortableHeader column={column} title="SO" />,
  },
  {
    accessorKey: "whip",
    header: ({ column }) => <SortableHeader column={column} title="WHIP" />,
  },
  {
    accessorKey: "avg",
    header: ({ column }) => <SortableHeader column={column} title="AVG" />,
  },
]
