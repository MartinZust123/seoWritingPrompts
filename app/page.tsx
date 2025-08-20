"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, FileText, Package, Copy, Check } from "lucide-react"

type ContentType = "blog" | "product" | null
type Step = "home" | "input1" | "input2" | "input3" | "prompts"

interface FormData {
  contentType: ContentType
  title?: string
  description?: string
  keywords?: string
}

export default function ContentWriter() {
  const [step, setStep] = useState<Step>("home")
  const [formData, setFormData] = useState<FormData>({
    contentType: null,
  })

  const handleContentTypeSelect = (type: ContentType) => {
    setFormData({ ...formData, contentType: type })
    setStep("input1")
  }

  const handleInput1Submit = (value: string) => {
    if (formData.contentType === "product") {
      setFormData({ ...formData, title: value })
    } else {
      setFormData({ ...formData, description: value })
    }
    setStep("input2")
  }

  const handleInput2Submit = (value: string) => {
    if (formData.contentType === "product") {
      setFormData({ ...formData, description: value })
      setStep("input3")
    } else {
      setFormData({ ...formData, keywords: value })
      setStep("prompts")
    }
  }

  const handleInput3Submit = (value: string) => {
    setFormData({ ...formData, keywords: value })
    setStep("prompts")
  }

  const handleGenerate = () => {
    console.log("Generating content with:", formData)
    if (formData.contentType === "product" || formData.contentType === "blog") {
      setStep("prompts")
    }
  }

  const goBack = () => {
    if (step === "input1") {
      setStep("home")
      setFormData({ contentType: null })
    } else if (step === "input2") {
      setStep("input1")
    } else if (step === "input3") {
      setStep("input2")
    } else if (step === "prompts") {
      if (formData.contentType === "product") {
        setStep("input3")
      } else {
        setStep("input2")
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step !== "home" && (
          <Button
            variant="ghost"
            onClick={goBack}
            className="mb-6 p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {step === "home" && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Content Writer</CardTitle>
              <CardDescription>Choose what you'd like to create</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
                onClick={() => handleContentTypeSelect("blog")}
              >
                <FileText className="w-6 h-6" />
                <span>Blog Post</span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
                onClick={() => handleContentTypeSelect("product")}
              >
                <Package className="w-6 h-6" />
                <span>Product Description</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "input1" && (
          <Card>
            <CardHeader>
              <CardTitle>{formData.contentType === "product" ? "Product Title" : "Article Topic"}</CardTitle>
              <CardDescription>
                {formData.contentType === "product"
                  ? "Enter the name of your product"
                  : "Describe what your article should be about"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input1Form contentType={formData.contentType} onSubmit={handleInput1Submit} />
            </CardContent>
          </Card>
        )}

        {step === "input2" && (
          <Card>
            <CardHeader>
              <CardTitle>{formData.contentType === "product" ? "Product Description" : "Keywords"}</CardTitle>
              <CardDescription>
                {formData.contentType === "product"
                  ? "Describe your product in detail"
                  : "Enter keywords for your article"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input2Form contentType={formData.contentType} onSubmit={handleInput2Submit} />
            </CardContent>
          </Card>
        )}

        {step === "input3" && (
          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
              <CardDescription>Enter keywords for your product description</CardDescription>
            </CardHeader>
            <CardContent>
              <Input3Form onSubmit={handleInput3Submit} />
            </CardContent>
          </Card>
        )}

        {step === "prompts" && formData.contentType === "product" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generated Prompts</CardTitle>
                <CardDescription>Copy these prompts to use with your AI models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PromptDisplay
                  title="Prompt 1"
                  prompt={`Create an SEO-optimized product description for the following product: ${formData.title}, 

using the original description: ${formData.description}. 

Return both the product title and the optimized description, formatted in a clear, readable text structure. Make it all in one, not seperately product description and title. The product title should be shorter than 60 characters.

The description should be 450-700 words long. Use simple, easy-to-understand language and write in short paragraphs (1-2 sentences each). Avoid complex sentence structures, jargon, and technical terms that are not commonly understood. Write in a natural, conversational style that flows well from beginning to end.

Optimize the description for the following keywords: ${formData.keywords}. Also optimize for other similar keywords, including obvious ones, synonyms, and longer-tail keywords not explicitly provided.`}
                />
                
                <PromptDisplay
                  title="Prompt 2"
                  prompt={`You are an expert SEO copywriter. 
Create an SEO-optimized product description for the following product: ${formData.title}, 
using the original description: ${formData.description}. 
Return both the product title and the optimized description, formatted in a clear, readable text structure. Make it all in one, not seperately product description and title. The product title should be shorter than 60 characters.

The description should be 450-700 words long. Use simple, easy-to-understand language and write in short paragraphs (1-2 sentences each). Avoid complex sentence structures, jargon, and technical terms that are not commonly understood. Write in a natural, conversational style that flows well from beginning to end.

Optimize the description for the following keywords: ${formData.keywords}. Also optimize for other similar keywords, including obvious ones, synonyms, and longer-tail keywords not explicitly provided.`}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {step === "prompts" && formData.contentType === "blog" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generated Prompts</CardTitle>
                <CardDescription>Copy these prompts to use with your AI models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PromptDisplay
                  title="Prompt 1"
                  prompt={`Write an SEO-optimized blog post about: ${formData.description}.
                  
Use simple language and keep paragraphs short (1-2 sentences each).
Target word count: 1,300–2,000 words.
Naturally include these keywords: ${formData.keywords}.
Also optimize for related keywords that are relevant to the topic - focus especially on the obvious ones.
Ensure the blog post title is under 60 characters.
Maintain a consistent tone of voice throughout the entire post.
Structure with clear headings and subheadings.
Include an engaging introduction and a concise conclusion.`}
                />
                
                <PromptDisplay
                  title="Prompt 2"
                  prompt={`You are an expert SEO copywriter.
Write an SEO-optimized blog post about: ${formData.description}.
                  
Use simple language and keep paragraphs short (1-2 sentences each).
Target word count: 1,300–2,000 words.
Naturally include these keywords: ${formData.keywords}.
Also optimize for related keywords that are relevant to the topic - focus especially on the obvious ones.
Ensure the blog post title is under 60 characters.
Maintain a consistent tone of voice throughout the entire post.
Structure with clear headings and subheadings.
Include an engaging introduction and a concise conclusion.`}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function Input1Form({ contentType, onSubmit }: { contentType: ContentType; onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {contentType === "product" ? (
        <Input
          placeholder="e.g., Wireless Bluetooth Headphones"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
      ) : (
        <Textarea
          placeholder="e.g., How to improve productivity while working from home"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          autoFocus
        />
      )}
      <Button type="submit" className="w-full" disabled={!value.trim()}>
        Continue
      </Button>
    </form>
  )
}

function Input2Form({ contentType, onSubmit }: { contentType: ContentType; onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {contentType === "product" ? (
        <Textarea
          placeholder="Describe your product features, benefits, and specifications..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={6}
          autoFocus
        />
      ) : (
        <Input
          placeholder="e.g., productivity, remote work, time management"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
      )}
      <Button type="submit" className="w-full" disabled={!value.trim()}>
        Continue
      </Button>
    </form>
  )
}

function Input3Form({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="e.g., wireless headphones, bluetooth, noise cancelling"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <Button type="submit" className="w-full" disabled={!value.trim()}>
        Continue
      </Button>
    </form>
  )
}

function PromptDisplay({ title, prompt }: { title: string; prompt: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{title}</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <pre className="text-sm whitespace-pre-wrap font-mono">{prompt}</pre>
      </div>
    </div>
  )
}