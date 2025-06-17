'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { generateRedeemCode, validateRedeemCode } from '@/lib/actions/redeem';

export default function TestPage() {
  // Redeem Code State
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [codeToValidate, setCodeToValidate] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  // Form state for plan selection
  const [selectedPlan, setSelectedPlan] = useState<0 | 1>(0);

  // Available plans from redeem.ts
  const plans = [
    { id: 0 as const, name: 'Pro Plan', description: '1000 points, valid for 30 days' },
    { id: 1 as const, name: 'Enterprise Plan', description: '5000 points, valid for 365 days' },
  ];

  // Handle code generation
  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      const { success, code, error } = await generateRedeemCode(selectedPlan);

      if (success && code) {
        setGeneratedCodes([code]);
        toast({
          title: 'Success',
          description: 'Redeem code generated successfully',
        });
      } else {
        throw new Error(error || 'Failed to generate codes');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate codes',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle code validation
  const handleValidateCode = async () => {
    if (!codeToValidate.trim()) return;

    try {
      setIsValidating(true);
      const { success, result, error } = await validateRedeemCode(codeToValidate);

      if (success) {
        setValidationResult(result);
        toast({
          title: 'Success',
          description: 'Code validated successfully',
        });
      } else {
        throw new Error(error || 'Invalid or expired code');
      }
    } catch (error: any) {
      setValidationResult(null);
      toast({
        title: 'Error',
        description: error.message || 'Invalid or expired code',
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl space-y-8 p-4">
      <h1 className="text-2xl font-bold">Redeem Code Test</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Redeem Code</CardTitle>
          <CardDescription>Select a plan to generate a redeem code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Select Plan</Label>
              <select
                id="plan"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(parseInt(e.target.value) as 0 | 1)}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {plan.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-muted rounded-md p-4">
              <h4 className="mb-2 font-medium">Plan Details:</h4>
              <div className="space-y-1 text-sm">
                <p>Name: {plans[selectedPlan].name}</p>
                <p>Points: {plans[selectedPlan].id === 0 ? '1000' : '5000'}</p>
                <p>Validity: {plans[selectedPlan].id === 0 ? '30' : '365'} days</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleGenerateCode} disabled={isGenerating} className="w-full sm:w-auto">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Code'
              )}
            </Button>
          </div>

          {generatedCodes.length > 0 && (
            <div className="mt-4">
              <Label>Generated Codes:</Label>
              <div className="mt-2 space-y-2">
                {generatedCodes.map((code, index) => (
                  <div key={index} className="bg-muted rounded-md p-2 font-mono text-sm">
                    {code}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 border-t pt-4">
            <Label htmlFor="code-to-validate">Validate Code</Label>
            <div className="mt-1 flex space-x-2">
              <Input
                id="code-to-validate"
                placeholder="Paste code to validate"
                value={codeToValidate}
                onChange={(e) => setCodeToValidate(e.target.value)}
              />
              <Button onClick={handleValidateCode} disabled={!codeToValidate.trim() || isValidating}>
                {isValidating ? <Loader2 className="size-4 animate-spin" /> : 'Validate'}
              </Button>
            </div>

            {validationResult && (
              <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                <h4 className="mb-2 font-medium">Validation Result:</h4>
                <pre className="overflow-auto rounded bg-white p-2 text-xs dark:bg-gray-900">
                  {JSON.stringify(validationResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
