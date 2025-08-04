import { ArrowRight, Github, Star, Users, Zap, Activity, MessageSquare, GitBranch, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge variant="secondary" className="mb-4">
              <Github className="w-3 h-3 mr-1" />
              100% Open Source
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Real-time collaboration
              <br />
              <span className="text-primary">made simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join rooms, manage tasks together, and track progress in real-time. Built for teams who value transparency
              and seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/auth/login">
                  Start Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/mudasarmajeed5/groupify" target="_blank">
                  <Github className="mr-2 w-4 h-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for team collaboration</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to keep your team synchronized and productive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Real-time Sync</CardTitle>
                <CardDescription>
                  See changes instantly as your team updates tasks, moves cards, and adds comments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Room-based Management</CardTitle>
                <CardDescription>
                  Create dedicated rooms for projects where team members can join, leave, and collaborate
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Activity Tracking</CardTitle>
                <CardDescription>
                  Complete activity history and feeds for every task with detailed change logs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Task Comments</CardTitle>
                <CardDescription>
                  Discuss tasks with threaded comments and keep all communication in context
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Kanban Dashboard</CardTitle>
                <CardDescription>
                  Intuitive drag-and-drop interface with customizable columns and task states
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Task Assignment</CardTitle>
                <CardDescription>
                  Assign tasks to team members with clear ownership and responsibility tracking
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See it in action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A clean, intuitive interface that gets out of your way
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="bg-background rounded-xl shadow-2xl overflow-hidden">
                {/* Mock Kanban Board */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Project Dashboard</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full border-2 border-background"></div>
                        <div className="w-8 h-8 bg-secondary rounded-full border-2 border-background"></div>
                        <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">3 members online</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* To Do Column */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">To Do</h4>
                        <Badge variant="secondary">3</Badge>
                      </div>
                      <div className="space-y-3">
                        <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-sm">Design new landing page</h5>
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">JD</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Create wireframes and mockups</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              Design
                            </Badge>
                            <span className="text-xs text-muted-foreground">2 comments</span>
                          </div>
                        </Card>

                        <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-sm">Setup CI/CD pipeline</h5>
                            <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">AM</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Configure GitHub Actions</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              DevOps
                            </Badge>
                            <span className="text-xs text-muted-foreground">1 comment</span>
                          </div>
                        </Card>
                      </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">In Progress</h4>
                        <Badge variant="secondary">2</Badge>
                      </div>
                      <div className="space-y-3">
                        <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-primary/50">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-sm">Real-time sync feature</h5>
                            <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">SK</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Implement WebSocket connections</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              Backend
                            </Badge>
                            <span className="text-xs text-muted-foreground">5 comments</span>
                          </div>
                        </Card>
                      </div>
                    </div>

                    {/* Done Column */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Done</h4>
                        <Badge variant="secondary">4</Badge>
                      </div>
                      <div className="space-y-3">
                        <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer opacity-75">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-sm">User authentication</h5>
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">MM</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Login and signup functionality</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              Auth
                            </Badge>
                            <span className="text-xs text-muted-foreground">3 comments</span>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Github className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">100% Open Source</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Built in the open, for everyone. No hidden fees, no vendor lock-in.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="https://github.com/mudasarmajeed5/groupify" target="_blank">
                  <Star className="mr-2 w-4 h-4" />
                  Star on GitHub
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/mudasarmajeed5/groupify/fork" target="_blank">
                  <GitBranch className="mr-2 w-4 h-4" />
                  Contribute
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Groupify</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="https://github.com/mudasarmajeed5/groupify"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
