"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Github,
  Download,
  Copy,
  Check,
  Palette,
  Zap,
  Code2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [activeDemo, setActiveDemo] = useState("default");
  const [stats, setStats] = useState({
    downloads: 0,
    stars: 0,
    version: "1.0.0",
  });

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const targetDownloads = 12543;
      const targetStars = 89;
      let currentDownloads = 0;
      let currentStars = 0;

      const interval = setInterval(() => {
        if (currentDownloads < targetDownloads) {
          currentDownloads += Math.ceil(targetDownloads / 50);
          if (currentDownloads > targetDownloads)
            currentDownloads = targetDownloads;
        }
        if (currentStars < targetStars) {
          currentStars += Math.ceil(targetStars / 30);
          if (currentStars > targetStars) currentStars = targetStars;
        }

        setStats((prev) => ({
          ...prev,
          downloads: currentDownloads,
          stars: currentStars,
        }));

        if (
          currentDownloads >= targetDownloads &&
          currentStars >= targetStars
        ) {
          clearInterval(interval);
        }
      }, 50);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installCommand = "npm install @theamrendram/react-green-graph";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">react-green-graph</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/theamrendram/react-green-graph"
              className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </Link>
            <Link
              href="https://www.npmjs.com/package/@theamrendram/react-green-graph"
              className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors">
              <ExternalLink className="w-4 h-4" />
              npm
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
            <Sparkles className="w-3 h-3 mr-1" />
            Latest v{stats.version}
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000">
            React Green Graph
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
            A React component that displays GitHub contribution graphs in your
            web application with customizable color themes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
            <div className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-mono text-sm">
              <span>{installCommand}</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-gray-700"
                onClick={() => copyToClipboard(installCommand)}>
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105">
              <Download className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-center animate-in slide-in-from-bottom-4 duration-1000 delay-600">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">
                {stats.downloads.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">Weekly Downloads</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">
                {stats.stars}
              </span>
              <span className="text-sm text-gray-500">GitHub Stars</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">0</span>
              <span className="text-sm text-gray-500">Dependencies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-gray-600 text-lg">
            Interactive demo with different color themes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs
            value={activeDemo}
            onValueChange={setActiveDemo}
            className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="default">Default</TabsTrigger>
              <TabsTrigger value="ocean">Ocean</TabsTrigger>
              <TabsTrigger value="sunset">Sunset</TabsTrigger>
              <TabsTrigger value="lily">Lily</TabsTrigger>
            </TabsList>

            <TabsContent value="default" className="space-y-4">
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <ContributionGraph theme="default" />
              </Card>
            </TabsContent>

            <TabsContent value="ocean" className="space-y-4">
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <ContributionGraph theme="ocean" />
              </Card>
            </TabsContent>

            <TabsContent value="sunset" className="space-y-4">
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <ContributionGraph theme="sunset" />
              </Card>
            </TabsContent>

            <TabsContent value="lily" className="space-y-4">
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <ContributionGraph theme="lily" />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose React Green Graph?
          </h2>
          <p className="text-gray-600 text-lg">
            Built with performance and customization in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Palette className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Customizable Themes</CardTitle>
              <CardDescription>
                Multiple built-in color themes with support for custom color
                schemes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Lightweight & Fast</CardTitle>
              <CardDescription>
                Zero dependencies, optimized for performance with minimal bundle
                size
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Code2 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>TypeScript Ready</CardTitle>
              <CardDescription>
                Full TypeScript support with comprehensive type definitions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple to Use</h2>
          <p className="text-gray-600 text-lg">
            Get started with just a few lines of code
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-900 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono">App.jsx</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-gray-700"
                  onClick={() =>
                    copyToClipboard(`import { ReactGreenGraph } from '@theamrendram/react-green-graph'

function App() {
  return (
    <ReactGreenGraph 
      username="theamrendram"
      token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}
    />
  )
}`)
                  }>
                  {copied ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto">
              <pre>{`import { ReactGreenGraph } from '@theamrendram/react-green-graph'

function App() {


  return (
    <ReactGreenGraph 
      username="theamrendram"
      token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}
    />
  )
}`}</pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join developers who are already using React Green Graph to create
            beautiful contribution visualizations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://www.npmjs.com/package/@theamrendram/react-green-graph"
              className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              Go to npm
            </Link>
            <Link
              href="https://github.com/theamrendram/react-green-graph"
              className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">react-green-graph</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link
                href="https://github.com/theamrendram/react-green-graph/blob/main/README.md"
                className="hover:text-green-600 transition-colors">
                Documentation
              </Link>
              <Link
                href="https://github.com/theamrendram/react-green-graph"
                className="hover:text-green-600 transition-colors">
                Examples
              </Link>
              <Link
                href="https://github.com/theamrendram/react-green-graph"
                className="hover:text-green-600 transition-colors">
                Support
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} @theamrendram/react-green-graph. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Mock Contribution Graph Component
function ContributionGraph({ theme }: { theme: string }) {
  const getThemeColors = (theme: string) => {
    switch (theme) {
      case "ocean":
        return ["#f0f9ff", "#bae6fd", "#38bdf8", "#0284c7", "#0c4a6e"];
      case "sunset":
        return ["#fef3c7", "#fcd34d", "#f59e0b", "#d97706", "#92400e"];
      case "lily":
        return ["#f3e8ff", "#c4b5fd", "#8b5cf6", "#7c3aed", "#5b21b6"];
      default:
        return ["#f0fdf4", "#bbf7d0", "#4ade80", "#16a34a", "#15803d"];
    }
  };

  const colors = getThemeColors(theme);
  const weeks = 52;
  const days = 7;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-53 gap-1 p-4">
        {Array.from({ length: weeks }, (_, weekIndex) =>
          Array.from({ length: days }, (_, dayIndex) => {
            const intensity = Math.floor(Math.random() * 5);
            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="w-3 h-3 rounded-sm transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ backgroundColor: colors[intensity] }}
                title={`${intensity} contributions`}
              />
            );
          })
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
