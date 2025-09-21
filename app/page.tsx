"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Crown, Settings, Plus, Minus, RefreshCw } from "lucide-react"

export default function PingPongScorer() {
  const [player1Score, setPlayer1Score] = useState(9)
  const [player2Score, setPlayer2Score] = useState(11)
  const [player1Name, setPlayer1Name] = useState("Player 1")
  const [player2Name, setPlayer2Name] = useState("Player 2")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const resetGame = () => {
    setPlayer1Score(0)
    setPlayer2Score(0)
    setTime(0)
    setIsRunning(false)
  }

  const winner =
    player1Score >= 11 || player2Score >= 11
      ? player1Score > player2Score
        ? 1
        : player2Score > player1Score
          ? 2
          : null
      : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col">
      {/* Timer Header */}
      <div className="flex items-center justify-center py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <div className="text-2xl font-mono font-bold text-foreground">{formatTime(time)}</div>
          <Button variant="outline" size="sm" onClick={() => setTime(0)} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Score Display */}
      <div className="flex-1 flex">
        {/* Player 1 Side */}
        <div className="flex-1 bg-primary text-primary-foreground flex flex-col items-center justify-center relative">
          {winner === 1 && <Crown className="absolute top-8 w-12 h-12 text-yellow-400 animate-bounce" />}

          <div className="text-center space-y-4">
            {isEditing ? (
              <Input
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="text-center text-xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/70"
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                autoFocus
              />
            ) : (
              <h2 className="text-xl font-bold cursor-pointer hover:opacity-80" onClick={() => setIsEditing(true)}>
                {player1Name}
              </h2>
            )}

            <div className="text-9xl font-bold font-mono">{player1Score}</div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setPlayer1Score(Math.max(0, player1Score - 1))}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Minus className="w-6 h-6" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setPlayer1Score(player1Score + 1)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Center Score Display */}
        <div className="w-32 bg-white flex flex-col items-center justify-center shadow-lg">
          <div className="text-4xl font-bold text-primary">{player1Score}</div>
          <div className="text-2xl font-bold text-muted-foreground">-</div>
          <div className="text-4xl font-bold text-secondary">{player2Score}</div>
        </div>

        {/* Player 2 Side */}
        <div className="flex-1 bg-secondary text-secondary-foreground flex flex-col items-center justify-center relative">
          {winner === 2 && <Crown className="absolute top-8 w-12 h-12 text-yellow-400 animate-bounce" />}

          <div className="text-center space-y-4">
            {isEditing ? (
              <Input
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="text-center text-xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/70"
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                autoFocus
              />
            ) : (
              <h2 className="text-xl font-bold cursor-pointer hover:opacity-80" onClick={() => setIsEditing(true)}>
                {player2Name}
              </h2>
            )}

            <div className="text-9xl font-bold font-mono">{player2Score}</div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setPlayer2Score(Math.max(0, player2Score - 1))}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Minus className="w-6 h-6" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setPlayer2Score(player2Score + 1)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white/90 backdrop-blur-sm p-4 shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={resetGame} className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Yangi o'yin
          </Button>

          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Settings className="w-4 h-4" />
            Sozlamalar
          </Button>
        </div>
      </div>

      {/* Winner Modal */}
      {winner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 text-center space-y-4 bg-white">
            <Crown className="w-16 h-16 text-yellow-400 mx-auto" />
            <h2 className="text-3xl font-bold">G'olib: {winner === 1 ? player1Name : player2Name}!</h2>
            <p className="text-muted-foreground">
              Natija: {player1Score} - {player2Score}
            </p>
            <Button onClick={resetGame} className="mt-4">
              Yangi o'yin boshlash
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
